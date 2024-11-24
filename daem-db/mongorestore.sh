echo "Restoring database..."
mongorestore --username ${MONGO_INITDB_ROOT_USERNAME} --password ${MONGO_INITDB_ROOT_PASSWORD}  --authenticationDatabase admin -d ${MONGO_INITDB_DATABASE} /docker-entrypoint-initdb.d/
