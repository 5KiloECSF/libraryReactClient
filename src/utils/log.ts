const Reset = "\x1b[0m"


const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"

const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"

export enum colors{
  Bright = "\x1b[1m",
 Dim = "\x1b[2m",
 Underscore = "\x1b[4m",
 Blink = "\x1b[5m",
 Reverse = "\x1b[7m",
 Hidden = "\x1b[8m",
  //--------------------   colors ---
  FgBlack = "\x1b[30m",
 FgWhite = "\x1b[37m",
 FgRed = "\x1b[31m",
 FgGreen = "\x1b[32m",
 FgYellow = "\x1b[33m",
 FgBlue = "\x1b[34m",
 FgMagenta = "\x1b[35m",
 FgCyan = "\x1b[36m",
 // ----------------------Bg --------
 BgBlack = "\x1b[40m",
 BgWhite = "\x1b[47m",
 BgRed = "\x1b[41m",
 BgGreen = "\x1b[42m",
 BgYellow = "\x1b[43m",
 BgBlue = "\x1b[44m",
 BgMagenta = "\x1b[45m",
 BgCyan = "\x1b[46m"

}
export const log_Fun=(name:string, value, color=colors.FgBlue, num=2)=>{
    console.log(color, "DEBUG:-", name,"--->v=",JSON.stringify(value), "---",Reset, (new Error().stack.split("at ")[num]).trim(), ">>>")
}
export const log_func=(name, value, color="", num=2)=>{
    let val
    switch (color){
        case "green":
            val=FgGreen
            break
        case "red":
            val=FgRed
            break
        case "yellow":
            val=FgYellow
            break
        case "magenta":
            val=FgMagenta
            break
        case "cyan":
            val=FgCyan
            break
        //------------------------------- Bg --------------
        case "BgGreen":
            val=BgGreen
            break
        case "BgYellow":
            val=BgYellow
            break
        case "BgMagenta":
            val=BgMagenta
            break
        case "BgBlue":
            val=BgBlue
            break
        case "BgRed":
            val=BgRed
            break
        case "BgCyan":
            val=BgCyan
            break

        default:
            val=FgBlue
    }
    console.log(val,"DEBUG:-", name,"--->v=",JSON.stringify(value), "---",Reset, (new Error().stack.split("at ")[num]).trim(), ">>>")
}

//
// exports.log_func=log_func
// module.exports=log_func
