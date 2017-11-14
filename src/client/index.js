//react and pages
import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';

//styles
//import css from './app.less';

//components
let Home = createReactClass({
render: function() {
     return <div>
                 <h1>Home page</h1>
            </div>
}
});

ReactDOM.render(<Home />, document.getElementById('app'));
