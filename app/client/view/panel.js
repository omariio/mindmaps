
// At some point, this should maybe grab the local copy of the data instead
// of the database copy
Template.panel.selected = function () {
  var selected_id = Session.get("selected");
  return Nodes.findOne({_id: selected_id}) || Links.findOne({_id: selected_id});
}

Template.panel.registeredCommenter = function () {
	var selected = Template.panel.selected();
	if (selected && selected.user)
		return selected.user;
	return null;
}

Template.panel.helpers({
  editingTitle: function(){
    return Session.get("editing-title");
  },
  editingBody: function(){
    return Session.get("editing-body");
  }
});

Template.panel.events({

	'click #delete-node': function () {
		Meteor.call("deleteNode", Session.get("selected"));
		Session.set("selected", undefined);
	},
  'click #edit-title': function () {
    Session.set("editing-title", true);
  },
  'click #save-title': function () {
    Nodes.update(Session.get("selected"), {$set:{title:$("#input-title").val()}});
    Session.set("editing-title", false);
  },
  'click #edit-body': function () {
    Session.set("editing-body", true);
  },
  'click #save-body': function() {
    Nodes.update(Session.get("selected"), {$set:{body:$("#textarea-body").val()}});
    Session.set("editing-body", false);
  },
  'click #new-node': function () {
    var target_id = Nodes.findOne({_id:Session.get("target_id")}).root_id;
    Nodes.insert({body:"", title:"", root_id: target_id, username:Meteor.user().username});
  }
})
