import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def create_admin_user():
    db = SessionLocal()
    try:
        # Verifica se já existe um usuário admin
        admin = db.query(User).filter(User.email == "admin@docuguardian.com").first()
        if admin:
            print("Usuário admin já existe")
            return

        # Cria o usuário admin
        admin_user = User(
            email="admin@docuguardian.com",
            username="admin",
            hashed_password=get_password_hash("admin123"),
            is_active=True,
            is_superuser=True
        )
        db.add(admin_user)
        db.commit()
        print("Usuário admin criado com sucesso")
    except Exception as e:
        print(f"Erro ao criar usuário admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user() 