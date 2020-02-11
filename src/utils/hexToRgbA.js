
// https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
//If you write your own code, remember hex color shortcuts (eg., #fff, #000)
export default function hexToRgbA(hex, alpha){
  // 添加个alpha参数
  let alp = Number(alpha);
  if (isNaN(alp)) throw new Error("alpha should be a number!")

  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length === 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+`,${alp})`;
  }
  throw new Error('Bad Hex');
}

// hexToRgbA('#fbafff')

/*  returned value: (String)
rgba(251,175,255,1)
*/