workflow "Build and deploy" {
  on = "push"
  resolves = ["Deploy to firebase"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  args = "run build.ci"
}

action "Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "test"
  needs = ["Build"]
}

action "Deploy to firebase" {
  uses = "w9jds/firebase-action@7d6b2b058813e1224cdd4db255b2f163ae4084d3"
  needs = ["Test"]
  secrets = ["FIREBASE_TOKEN"]
  args = "deploy --project next --only hosting"
}
