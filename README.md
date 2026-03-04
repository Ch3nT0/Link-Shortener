# 🚀 Serverless URL Shortener & Analytics System

Hệ thống rút gọn liên kết (URL Shortener) được xây dựng trên kiến trúc **Serverless** của AWS. Dự án không chỉ tập trung vào tính năng mà còn chú trọng vào quy trình **CI/CD** và quản lý hạ tầng bằng mã (**IaC**).

## 🏗 Kiến trúc hệ thống (Architecture)
Hệ thống sử dụng các dịch vụ Cloud-native để đảm bảo khả năng mở rộng tự động và tối ưu chi phí:
* **API Gateway**: Tiếp nhận và định tuyến các HTTP request.
* **AWS Lambda**: Xử lý logic nghiệp vụ (Node.js 18.x/20.x).
* **Amazon DynamoDB**: Cơ sở dữ liệu NoSQL lưu trữ cặp khóa (shortCode - longUrl) với tốc độ cao.
* **AWS Certificate Manager & Route 53**: Quản lý chứng chỉ SSL và cấu hình Custom Domain.
* **Infrastructure as Code (IaC)**: Sử dụng **Serverless Framework** để định nghĩa và triển khai hạ tầng.

## ⚡ Tính năng chính
- [x] **Rút gọn URL**: Chuyển đổi link dài thành mã định danh ngắn gọn.
- [x] **Auto Redirection**: Tự động điều hướng người dùng (301/302 Redirect) khi truy cập link ngắn.
- [x] **High Availability**: Tự động mở rộng (Auto-scaling) theo lượng truy cập.
- [x] **Custom Domain**: Tích hợp tên miền riêng giúp chuyên nghiệp hóa dịch vụ.

## 🛠 Quy trình CI/CD
Dự án được thiết lập luồng **Continuous Integration & Deployment** thông qua **GitHub Actions**:
1.  **Trigger**: Tự động kích hoạt khi có lệnh `git push` vào nhánh `main`.
2.  **Environment**: Khởi tạo môi trường Ubuntu, cài đặt Node.js.
3.  **Build**: Cài đặt các dependencies cần thiết.
4.  **Deploy**: Tự động triển khai/cập nhật lên AWS Lambda thông qua Serverless Framework.

## 📖 Hướng dẫn sử dụng

### 1. Cài đặt môi trường
```bash
# Clone dự án
git clone [https://github.com/Ch3nT0/serverless-url-shortener.git](https://github.com/Ch3nT0/serverless-url-shortener.git)
cd serverless-url-shortener

# Cài đặt thư viện
npm install
```
### 2. Triển khai (Deployment)
```bash
# Cấu hình AWS Credentials (nếu chưa có)
serverless

# Triển khai lên AWS
npx serverless deploy
```
### 3. API Endpoints
Tạo link ngắn:
```
POST /shorten
```
Body: { "longUrl": "https://your-long-url.com" }

Truy cập link:
```
GET /{shortCode}
```
