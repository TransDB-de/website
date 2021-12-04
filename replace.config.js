const config = [
	// for commenting html
	// usage: `# comment`
	[/^\s*# (.+)$/gim, '\<\!\-\-$1\-\-\>']
];

export default config;
