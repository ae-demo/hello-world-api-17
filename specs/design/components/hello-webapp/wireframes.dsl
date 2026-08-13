// Hello World webapp — single screen

screen Greeting "Visitor opens the app and sees the Hello World greeting"
  navbar "Hello World"
  heading "Hello, World!"
  text "This greeting was fetched live from the hello-api service."
  card "Status | Connected | hello-api responded successfully"
  button "Refresh greeting" primary
