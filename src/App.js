import React, { Component } from "react";
import PENGINAPAN from "./Component/penginapan";
import GoogleMapReact from "google-map-react";
import Marker from "./Component/marker";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      penginapane: [],
      pilihPenginapan: null,
      semuaPenginapan: [],
      cari: " "
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json" // mengambil data dari file JSON
    )
      .then(response => response.json())
      .then(data => {
        this.setState({       //membuat state yang berisi variable data
          penginapane: data,
          semuaPenginapan: data
        });
      });
  }
  pilihPenginapan = inap => {  // membuat kelas dengan parameter inap yang mengebind state pilihPenginapan
    this.setState({
      pilihPenginapan: inap
    });
  };
  cariPenginapan = event => { // membuat kelas dengan parameter event yang mengebind beberapa state
    this.setState({
      cari: event.target.value,
      penginapane: this.state.semuaPenginapan.filter(inap =>
        new RegExp(event.target.value, "i").exec(inap.nama)
      )
    });
  };
  render() {    // kelas render adalah kelas yang akan ditampilkan di halaman pengguna
    let center = {    // menampilkan tampilan ke koordinat tertentu
      lat: -7.9768247,
      lng: 112.6567693
    };
    if (this.state.pilihPenginapan) {   // menampilkan koordinat dari suatu penginapan
      center = {
        lat: this.state.pilihPenginapan.lat,
        lng: this.state.pilihPenginapan.lng
      };
    }
    return (        // tampilan untuk pengguna atau user
      <div className="app">
        <div className="main">
          <div className="cari">
            <input    // tempat pengguna menginputkan tempat penginapan yang dicari
              type="text"
              placeholder="Pencarian...."
              value={this.state.cari}
              onChange={this.cariPenginapan}
            />
          </div>
          <div className="Penginapan">
            {this.state.penginapane.map(inapin => { // menampilkan data penginapan
              return (
                <PENGINAPAN
                  key={inapin.id}
                  inap={inapin}
                  pilihPenginapan={this.pilihPenginapan}
                />
              );
            })}
          </div>
        </div> 
        <div className="peta">    
          <GoogleMapReact center={center} zoom={15}>    
            {this.state.penginapane.map(inapin => {     // menampilkan data detail penginapan
              return (
                <Marker
                  key={inapin.id}
                  lat={inapin.lat}
                  lng={inapin.lng}
                  text={inapin.harga}
                  dipilih={inapin === this.state.pilihPenginapan}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
export default App; // mengekspor file agar dapat dieksekusi
