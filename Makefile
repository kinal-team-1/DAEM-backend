start: close-local-db sleep-2 start-db sleep-5 init-replica
	@node --eval 'console.log(require("chalk").green("Finish setting up DB"))'

start-db:
	@node --eval 'console.log(require("chalk").green("Starting MongoDB..."))'
	docker run -d -p 27017:27017 --name daem-db mongo:latest --replSet rs0 --bind_ip_all

close-local-db:
	@node --eval 'console.log(require("chalk").magenta("Closing Local Mongo instance..."))'
	-mongosh --eval 'use admin' --eval 'db.adminCommand({shutdown: 1})'


init-replica:
	@node --eval 'console.log(require("chalk").green("Initializing Replica Set..."))'
	docker run --rm mongo:latest mongosh --host 172.17.0.1 --eval 'rs.initiate()'

sleep-%:
	sleep $(@:sleep-%=%)
