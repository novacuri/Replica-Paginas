function generatePages() {
	const fs = require("fs");
	const Handlebars = require("handlebars");

	// 1. Leer el archivo JSON utilizando el sistema de archivos
	const data = JSON.parse(fs.readFileSync("datos.json"));

	// 2. Compilar la plantilla Handlebars utilizando la función `Handlebars.compile`
	const source = fs.readFileSync("template.html", "utf8");
	const template = Handlebars.compile(source);

	// 3. Iterar sobre los datos del archivo JSON y generar HTML para cada página
	data.forEach((item) => {
		const html = template(item);

		// 4. Escribir el HTML generado en archivos HTML separados utilizando el sistema de archivos
		const filename = "../pages/" + item.pageName + ".html";
		fs.writeFileSync(filename, html);
	});
}

generatePages();