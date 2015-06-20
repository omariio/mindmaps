
// At some point, this should maybe grab the local copy of the data instead
// of the database copy
Template.nodeviewer.selected = function () {
  var selected_id = Session.get("selected");
  return Nodes.findOne({_id: selected_id}) || Links.findOne({_id: selected_id});
}

Template.nodeviewer.registeredCommenter = function () {
	var selected = Template.nodeviewer.selected();
	if (selected && selected.user)
		return selected.user;
	return null;
}

Template.nodeviewer.helpers({
  editingBody: function(){
    return Session.get("editing-body");
  }
});

Template.nodeviewer.events({
	'click #delete-node': function () {
		Meteor.call("deleteNode", Session.get("selected"));
		Session.set("selected", undefined);
	},
  'click #edit-body': function () {
    Session.set("editing-body", true);
  },
  'click #save-body': function() {
    Nodes.update(Session.get("selected"), {$set:{body:$("#textarea-body").val()}});
    Session.set("editing-body", false);
  }
})
