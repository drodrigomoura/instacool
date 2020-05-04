import * as React from "react";
import ProfileImg from "../../components/ProfileImg";
import Button from "../../components/Button";
import Card from "../../components/Card";
import * as postsDuck from "../../ducks/Posts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import services from "../../services";
import { chunk } from "lodash";
import { submit } from "redux-form";

const { auth } = services;

const style = {
  container: {
    padding: "15px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  img: {
    width: "100px",
  },
};

interface IProfileProps {
  fetchPosts: () => void;
  submitProfileImg: () => void;
  handleProfileImageSubmit: (a: any) => void; //{ file: File } puse any porque con esto no funciona
  fetched: boolean;
  loading: boolean;
  data: postsDuck.IPost[][];
}

class Profile extends React.Component<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);
    const { fetchPosts, fetched } = props;
    if (fetched) {
      return;
    }
    fetchPosts();
  }
  public render() {
    const { data, submitProfileImg, handleProfileImageSubmit } = this.props;
    return (
      <div style={style.container}>
        <div style={style.row}>
          <ProfileImg
            onSubmit={handleProfileImageSubmit}
            submitProfileImg={submitProfileImg}
          />
          <Button>Agregar</Button>
        </div>
        {data.map((x, i) => (
          <div key={i} style={style.row}>
            {x.map((y) => (
              <Card>
                <img src={y.imageURL} style={style.img} alt="img" />
              </Card>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log("mapstatetoprops", state);

  const {
    Post: { data, fetching, fetched },
  } = state;
  const loading = fetching || !fetched;
  console.log(auth.currentUser && auth.currentUser.uid);

  const filtered = Object.keys(data).reduce((acc, el) => {
    if (data[el].userId !== (auth.currentUser && auth.currentUser.uid)) {
      return acc;
    }
    return acc.concat(data[el]);
  }, [] as postsDuck.IPost[]);

  return {
    data: chunk(filtered, 3),
    fetched,
    loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) =>
  bindActionCreators(
    {
      ...postsDuck,
      submitProfileImg: () => submit("profileImg"),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
