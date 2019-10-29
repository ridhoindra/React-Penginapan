import React, {Component} from"react";
import "./penginapan.css";

class penginapan extends Component {
    handleClick = () => {
        this.props.pilihpenginapan(this.props.inap);
    };
    render() { // menampilkan data apa saja yang ditampilkan ke pengguna atau user
        const judul = `${this.props.inap.nama} - Rp. ${this.props.inap.harga} rb `;
        const style = { backgroundImage: `url('${this.props.inap.fotoUrl}')`};

        return(  // menampilkan list data penginapan
            <div className="penginapan" onClick={this.handleClick}>    
                <div className="penginapan-foto" style={style}>
                    {" "}
                </div>
                <div className="penginapan-judul">{judul}</div>
            </div>
        );
    }
}

export default penginapan;