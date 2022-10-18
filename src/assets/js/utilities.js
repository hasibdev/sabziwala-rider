window.utilities = {
    setCookie: (cname, cvalue, exdays) => {
        if (!exdays) {
            document.cookie =
                cname +
                "=" +
                cvalue +
                ";domain=" +
                window.location.hostname +
                ";path=/"
        } else {
            var d = new Date()
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
            var expires = "expires=" + d.toUTCString()
            document.cookie =
                cname +
                "=" +
                cvalue +
                ";" +
                expires +
                ";domain=" +
                window.location.hostname +
                ";path=/"
        }
    },

    getCookie: (cname) => {
        var name = cname + "="
        var ca = document.cookie.split(";")
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == " ") {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return false
    },

    removeCookie(cname) {
        document.cookie =
            cname +
            "=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=" +
            window.location.hostname
    },
}