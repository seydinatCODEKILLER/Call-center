terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# Groupe de sécurité
resource "aws_security_group" "call221_sg" {
  name        = "${var.app_name}-sg"
  description = "Groupe de securite pour call221"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name}-sg"
  }
}

# Instance EC2
resource "aws_instance" "call221_server" {
  ami                    = "ami-09a9858973b288bdd"
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.call221_sg.id]

  tags = {
    Name = var.app_name
  }
}

# IP Elastic fixe (ne change jamais)
resource "aws_eip" "call221_ip" {
  instance = aws_instance.call221_server.id
  domain   = "vpc"

  tags = {
    Name = "${var.app_name}-eip"
  }
}