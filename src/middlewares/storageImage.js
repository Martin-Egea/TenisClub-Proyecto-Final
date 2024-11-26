import multer from "multer";

// Configuración de multer
const guardar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads");
  },
  filename: function (req, file, cb) {
    if (file !== null) {
      const extension = file.originalname.split(".")[1];
      cb(null, Date.now() + "." + extension);
    }
  },
});

// Función para filtrar los archivos
const filtro = (req, file, cb) => {
  if (
    (file && file.mimetype === "image/jpeg") ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const subirImagen = multer({ storage: guardar, fileFilter: filtro });
