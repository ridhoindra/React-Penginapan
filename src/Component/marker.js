import React, { Component } from "react";
import "./marker.css";

class marker extends React.Component {
    render() {
        let kelas = "marker";  // menampilkan apa yang di pilih user
        if(this.props.dipilih) {
            kelas = "dipilih";
        }
        return <div className={kelas}>{this.props.text} rb</div>;
    }
} 

export default marker;