import path from "path";
import { generateApi } from "swagger-typescript-api";

(async () => {
  try {
    await generateApi({
      url: "https://ecouture-back.onrender.com/api/schema/", //"http://localhost:8000/api/schema/", // ton endpoint swagger.json
      output: path.resolve(process.cwd(), "src/shared/api"), // dossier de sortie
      fileName: "api.ts", // nom du fichier généré
      extractEnums:true,
      httpClientType: "axios", // utiliser axios
      // modular: true, // génère des fichiers modulaires si besoin
      generateClient: true, // génère le client
      
      extractRequestParams: true, // sépare les params dans la fonction
    });
    console.log("API générée avec succès !");
  } catch (err) {
    console.error("Erreur de génération :", err);
  }
})();
