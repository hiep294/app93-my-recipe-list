import React from 'react';
import Form from './components/Form'
import Recipes from './components/Recipes'
import { RecipeProvider } from './contexts/RecipeContext'

function App() {
  return (
    <div className="App" style={{ minHeight: '900px' }}>
      <div>
        <nav className="navbar navbar-dark navbar-expand-md bg-dark">
          <div className="container"><button className="navbar-toggler" data-toggle="collapse" data-target="/#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav d-lg-flex flex-grow-1 justify-content-between align-items-lg-center">
                <li className="nav-item" role="presentation"><a className="nav-link active" href="/#">My Recipe List</a></li>
                <li className="nav-item" role="presentation"><a className="nav-link" href="https://github.com/hiep294/app93-my-recipe-list"><i className="fa fa-github" />&nbsp;Github</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <section>
          <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
            <div className="row no-gutters">
              <RecipeProvider>
                <div className="col col-main">
                  <Recipes />
                </div>
                <div className="col col-side">
                  <Form />
                </div>
              </RecipeProvider>
            </div>
          </div>
        </section>
      </div>

    </div>

  );
}

export default App;
