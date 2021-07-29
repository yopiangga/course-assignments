import { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import DishDetail from "./DishDetailComponent";
import Menu from "./MenuComponent";
import { DISHES } from "./../shared/dishes";
import { COMMENTS } from "./../shared/comments";
import { PROMOTIONS } from "./../shared/promotions";
import { LEADERS } from "./../shared/leaders"
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Route, Switch } from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
        this.onDishSelect = this.onDishSelect.bind(this);
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        })
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                  comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
            );
          };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path="/contactus" component={Contact} />
                    <Route to="/home" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Main;