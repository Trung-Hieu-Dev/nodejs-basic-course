exports.getErrorPage = (req, res, next) => {
	// res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
	res.status(404).render("404", { pageTitle: "Page Not Found", path: '' }); // pass data to template { pageTitle: "Page Not Found" }
};
