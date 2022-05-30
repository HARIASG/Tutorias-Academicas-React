const bcrypt = require("bcryptjs");
const encriptar = async (text)=>{
    const rondas = 10;
    const palabraEncriptada = await bcrypt.hash(text, rondas);
    return palabraEncriptada
}
const desencriptar = async (text,textoEncriptado)=>{
    const palabraValida = await bcrypt.compare(text, textoEncriptado);
    return palabraValida
}

function binary_encode( s ){
    s = unescape( encodeURIComponent( s ) );
    var chr, i = 0, l = s.length, out = '';
    for( ; i < l; i ++ ){
        chr = s.charCodeAt( i ).toString( 2 );
        while( chr.length % 8 != 0 ){ chr = '0' + chr; }
        out += chr;
    }
    return out;
}

function binary_decode( s ){
    var i = 0, l = s.length, chr, out = '';
    for( ; i < l; i += 8 ){
        chr = parseInt( s.substr( i, 8 ), 2 ).toString( 16 );
        out += '%' + ( ( chr.length % 2 == 0 ) ? chr : '0' + chr );
    }
    return decodeURIComponent( out );
}

module.exports = {
    encriptar,
    desencriptar,
    binary_encode,
    binary_decode
}