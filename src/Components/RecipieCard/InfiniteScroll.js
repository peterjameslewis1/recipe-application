import React from "react";
import { render } from "react-dom";


const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class App extends React.Component {
  state = {
    recipes: [],
  };


  componentWillMount() {
    this.fetchMoreData()
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    const apiKey = 'bd44e3839f3e7ae8efc4d7ec57ca1e03';
    const appId = '0e146f59';


    fetch(`https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=Vegetarian&app_key=${apiKey}&app_id=${appId}`)
      .then(res => res.json())
      .then(data => this.setState({ data: data }));

    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 10 }))
      });
    }, 1500);
  };

  render() {
    console.log(this.state.items.length);
    console.log(this.state.data);
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
