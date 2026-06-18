output "instance_ip" {
  description = "IP publique de l'instance EC2"
  value       = aws_instance.call221_server.public_ip
}

output "instance_id" {
  description = "ID de l'instance EC2"
  value       = aws_instance.call221_server.id
}

output "swagger_url" {
  description = "URL du Swagger"
  value       = "http://${aws_instance.call221_server.public_ip}:3000/api-docs"
}
