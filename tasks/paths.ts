let base = {
	source: "source",
	destination: "build",

	clientDir: "client",
	serverDir: "server"
};

let client = {
	source: {
		root: `${base.source}/${base.clientDir}`,
		styles: `${base.source}/${base.clientDir}/sass`,
		typescript: `${base.source}/${base.clientDir}/ts`,
		scripts: `${base.source}/${base.clientDir}/js`,
		fonts: `${base.source}/${base.clientDir}/fonts`,
		assets: `${base.source}/${base.clientDir}/media`
	},

	destination: {
		root: `${base.destination}/${base.clientDir}`,
		styles: `${base.destination}/${base.clientDir}/styles`,
		scripts: `${base.destination}/${base.clientDir}/scripts`,
		assets: `${base.destination}/${base.clientDir}/media`,
		fonts: `${base.destination}/${base.clientDir}/fonts`
	}
};

let server = {
	source: {
		base: `${base.source}/${base.serverDir}`,
	},

	destination: {
		base: `${base.destination}/${base.serverDir}`
	}
};
export { base, client, server };