variable "region" {
  description = "Région AWS"
  default     = "eu-north-1"
}

variable "instance_type" {
  description = "Type d'instance EC2"
  default     = "t3.micro"
}

variable "key_name" {
  description = "Nom de la paire de clés SSH"
  default     = "call221-key"
}

variable "app_name" {
  description = "Nom de l'application"
  default     = "call221-server"
}
