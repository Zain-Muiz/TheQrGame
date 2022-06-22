# The QR Game

# Tech Stack

- NodeJs / Express
- MySQL / Sequelize

# Database Structure

- Models :
  - QR_Model
    - id
    - link
    - qr_level
  - QR_Level
    - id
    - qr_level
    - qr_point
  - Users
    - id
    - name
    - email
    - ph_no
    - batch
    - score
    - profile_updated
  - User_Qrs
    - id
    - user_id
    - qr_id
