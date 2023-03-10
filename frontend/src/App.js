import './App.css';
import Footer from './component/footer/Footer';
import Header from './component/Header/Header';
import Landingpage from './screens/landingpage/Landingpage.js';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';
import Loginscreen from './screens/loginscreen/LoginScreen';
import RegisterScreen from './screens/registerscreen/RegisterScreen';
import CreateNote from './screens/SingleNote/CreateNote';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import SingleNote from './screens/SingleNote/SingleNote';
import ProfessionalMyNote from './screens/MyNotes/ProfessionalMyNote';
import Professionalnote from './screens/SingleNote/Professionalnote';
import { useState } from "react";


const App =() =>{
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <Router>
      <Header setSearch={setSearch}/>
      <main className="App">
        <Route path="/" component={Landingpage} exact />
        <Route path="/login" component={Loginscreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/professionalMyNote" component={ProfessionalMyNote} />
        <Route path="/professionalcreate" component={Professionalnote} />
        
        <Route
          path="/mynotes"
          component={({ history }) => (
            <MyNotes search={search} history={history} />
          )}
        />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/createnote" component={CreateNote} />;
        <Route path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
 
)};

export default App;
