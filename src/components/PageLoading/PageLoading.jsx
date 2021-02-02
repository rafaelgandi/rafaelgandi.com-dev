
import React from 'react';
import PropTypes from 'prop-types';
import './styles/PageLoading.module.scss';
import { Spinner } from 'react-bootstrap';

export default function PageLoading(props) {
    const logo = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABQCAMAAACXiiMNAAAAe1BMVEUAAACAgP9mmf9mmfJumfdplvRsl/JqmO5rl/Fol+9pmO9ql+9ql+9omO5qmO9pmO5pl+9pl+5ol+9qmO9pmO9pmO9ql/BpmO/////2+f7q8f3a5vvZ5fvR3/rH2fm+0vi1zPerxfaiv/WYuPSPsvOGq/J8pfFznvBqmO8KIfR/AAAAGHRSTlMABAoUHi47TVhibYKTmqu4wMXN2eTr9/wtAPVzAAACVElEQVR42u2W2Y7aMBSGf9vZyABTTQepc9X3f61W3TQdRmJJHMdLhQcQuLYJ8U0XvoCQwfnwOfGxTTCpF8DSYHfZl0EUYq/9xwOe2wZk8hGJfGpojVRq0AVSeaQU6RAKpHOT3CT/oSRz2pwDLqQqAcBs5VtzUsRHIjwOmNbe3cp9s1FxiYQXef5bPz4nZmhiWaRX5vQKSgqvpbCZrOihmcefDpl5skLezGymDk1XEvnChWR//Iz9xyRuwqXQAKsIAAgBH6TM4hK1saZ+HihoSz/NouH0sGi5kyCEwAXJEFRckp/GDofBBQgLywCUCFHGE0vnQmnGrKtiUsJDXtC4BLQ66Z3/dTP2JvmdbPmAM4ww8LGfHFKCFnAlzi16beCF3+WHyuZz53+pdvoaBGhxqGwtcMpSU+MWaAht3xbtbK9UYSAEAPXVt3YksdItjosAyR1JptyunfalheVWP22VYSV1FrJMejbvMKQGXBRo/4pEJCg40lj2oBBIg2MnSYyn20lUWjwvAqBWlQA3AAOkucNoXlfajgRbjKeRABjsUJIGYkdC1hjLVh4rSvE5RvFzZY4S9CMD+i5PFmozLqDP4uyUoDbvcDXfNs5RQzb3V8eyMo6E9N2Vyf1hHc6hR7T3141D+05O/dpMMJSvKwOfBEroGsP4skbodEfI7GnQHNtwBCSWevpwsV62jY6fJnvRzS5llBvPvuZQThcI8rzpfJujh8ndYyAZTWswUAJa1Y8+BddATOJSlU9OpXQcAQiCsLL4cMym6BQQk8Q8Wfn+pZMxA4BfobHWfWXlju4AAAAASUVORK5CYII=`;
    return (
        <div className={css.container}>
            <img src={logo} className="mx-auto d-block" />
            <div className="mx-auto my-5" >
                <Spinner 
                    animation="border" 
                    variant="primary"
                    className="d-block mx-auto"
                    style={{opacity: 0.3}}
                />
            </div>            
        </div>
    );
}
PageLoading.propTypes = {};
    
