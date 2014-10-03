

window.localStorage = chrome.storage.local;

var client = new Dropbox.Client({ key: "YOUR_KEY" });

        client.onError.addListener(function (error) {
            if (window.console) {  // Skip the "if" in node.js code.
                console.error(error);
            }
        });


        client.authenticate(function (error, client) {
            if (error) {
                // Replace with a call to your own error-handling code.
                //
                // Don't forget to return from the callback, so you don't execute the code
                // that assumes everything went well.
                return showError(error);
            }

            // Replace with a call to your own application code.
            //
            // The user authorized your app, and everything went well.
            // client is a Dropbox.Client instance that you can use to make API calls.
            //doSomethingCool(client);

            /*  client.getAccountInfo(function(error, accountInfo) {
             if (error) {
             return showError(error);  // Something went wrong.
             }

             alert("Hello, " + accountInfo.name + "!");
             });*/


            client.readdir("/", function(error, entries) {
             	if (error) {
            	 	return showError(error);  // Something went wrong.
             	}

             	alert("Your Dropbox contains " + entries.join(", "));
             });

            /*var options = {download: true};

            client.makeUrl("/Musik/Big Giant Circles - Threes Ost - 01 Threes Is The Bees Knees.mp3", options, function (error, shareUrl) {
                if (error) {
                    return showError(error);  // Something went wrong.
                }

                alert("Your Dropbox contains " + shareUrl.url);

                //var audio = new Audio(shareUrl.url);
                //audio.play();

            });*/


        });

        var showError = function (error) {
            switch (error.status) {
                case Dropbox.ApiError.INVALID_TOKEN:
                    // If you're using dropbox.js, the only cause behind this error is that
                    // the user token expired.
                    // Get the user through the authentication flow again.
                    break;

                case Dropbox.ApiError.NOT_FOUND:
                    // The file or folder you tried to access is not in the user's Dropbox.
                    // Handling this error is specific to your application.
                    break;

                case Dropbox.ApiError.OVER_QUOTA:
                    // The user is over their Dropbox quota.
                    // Tell them their Dropbox is full. Refreshing the page won't help.
                    break;

                case Dropbox.ApiError.RATE_LIMITED:
                    // Too many API requests. Tell the user to try again later.
                    // Long-term, optimize your code to use fewer API calls.
                    break;

                case Dropbox.ApiError.NETWORK_ERROR:
                    // An error occurred at the XMLHttpRequest layer.
                    // Most likely, the user's network connection is down.
                    // API calls will not succeed until the user gets back online.
                    break;

                case Dropbox.ApiError.INVALID_PARAM:
                case Dropbox.ApiError.OAUTH_ERROR:
                case Dropbox.ApiError.INVALID_METHOD:
                default:
                // Caused by a bug in dropbox.js, in your application, or in Dropbox.
                // Tell the user an error occurred, ask them to refresh the page.
            }
        };