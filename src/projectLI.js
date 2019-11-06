function ProjectLI() {}

ProjectLI.prototype.getTitle = function getTitle() { return this.title; };

ProjectLI.prototype.setTitle = function setTitle(t) {
  this.title = t || this.title;
};

export default ProjectLI;
