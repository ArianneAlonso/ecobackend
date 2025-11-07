# Usa una imagen oficial de Node.js
FROM node:22

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala dependencias
RUN npm install

# Expone el puerto si usás uno (ej: 3000)
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "run", "dev"]