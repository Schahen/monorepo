package org.shabunc.kotlinjs

import kotlin.browser.document

fun main(args: Array<String>) {
    document.addEventListener("DOMContentLoaded", {
        Ping().ping()
        Pong().pong()
    })
}