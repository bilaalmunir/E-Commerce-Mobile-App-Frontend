import { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native-web";

class Cardetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bought: false,
    };
  }
  componentDidUpdate() {
    if (this.state.bought !== this.prevState.bought) {
    }
  }
  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    const { detail, user } = route.params;
    console.log("detail object", JSON.stringify(detail, null, 2));
    console.log("car id" + detail.id);
    console.log("user id" + user.userID);
    console.log("car published by:" + detail.publishedBy);
    const buyCar = async () => {
      const response = await fetch(
        `http://localhost:8000/buyCar?ID=${detail.id}&userID=${user.userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const json = await response.json();
      console.log("json:" + json.ID);
      if (json.ID) {
        this.setState({ bought: true });
        console.log("itna chal gya");
      }
    };
    const deleteCar = async () => {
      const response = await fetch(
        `http://localhost:8000/deleteCar?carId=${detail.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const json = response.status;
      console.log("json delete API:" + json);
      if (json) {
        this.props.navigation.navigate("MainPage", { user: user });
      }
    };
    return (
      <View>
        <Text>ID OF PUBLISHER:{detail.publishedBy}</Text>
        <Text>Car Name:{detail.carName}</Text>
        <Text>Car Model:{detail.model}</Text>
        <Text>Car Color:{detail.color}</Text>
        {detail.status ? (
          <Text> The Car is sold!</Text>
        ) : (
          <View>
            <Text>The Car is still on Market!</Text>
            {detail.publishedBy !== user.userID ? (
              <View>
                <TouchableOpacity onPress={() => buyCar()}>
                  <Text>BUY</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
        {detail.publishedBy === user.userID ? (
          <View>
            <TouchableOpacity onPress={() => deleteCar()}>
              <Text>Click here to remove to car from the list!</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Cardetails;
