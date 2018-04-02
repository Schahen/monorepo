
external fun require(module:String):dynamic

fun main(args: Array<String>) {
    val express = require("express")
    val app = express()

    app.get("/", { _, res ->
        res.type("text/plain")
        res.send("ich bin ein Schmetterling\n")
    })

    val port = 4000
    app.listen(port, {
        println("Listening on port $port")
    })
}
