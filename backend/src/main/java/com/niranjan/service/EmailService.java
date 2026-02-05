package com.niranjan.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    @Value("${app.mail.fromName}")
    private String fromName;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendWelcomeEmail(String toEmail, String username) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("You’re in! Your KUT.to account is ready 🚀");

        String htmlTemplate = """
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
                body {
                    margin: 0; padding: 0; background-color: #ffffff;
                    font-family: 'Poppins', sans-serif; color: #1e293b;
                }
                .container {
                    max-width: 600px; margin: 0 auto;
                }
                
                /* Top Bar */
                .top-bar {
                    background-color: #f8fafc; padding: 12px; text-align: center;
                    font-size: 11px; color: #94a3b8; margin-bottom: 30px;
                }
                
                /* Logo: Matching App Style (Italic, Tighter Tracking) */
                .logo-area {
                    text-align: center; margin-bottom: 30px;
                }
                .logo-text {
                    font-size: 34px; font-weight: 800; letter-spacing: -2px; 
                    font-style: italic; margin: 0;
                    color: #0f172a; /* Dark Slate to match brand on white bg */
                }

                /* Hero Section */
                .hero-text {
                    text-align: center; padding: 0 20px;
                }
                .h1-title {
                    font-size: 32px; font-weight: 800; line-height: 1.15; margin: 0 0 16px; color: #0f172a;
                }
                .sub-text {
                    font-size: 16px; line-height: 1.6; color: #475569; margin: 0 auto 30px; max-width: 480px;
                }

                /* CTA Button - High Contrast */
                .cta-wrapper {
                    text-align: center; margin-bottom: 40px;
                }
                .btn-primary {
                    background-color: #2563eb; color: #ffffff !important; /* Force White Text */
                    padding: 16px 36px; border-radius: 99px;
                    text-decoration: none; font-weight: 600; font-size: 16px;
                    display: inline-block;
                    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
                }

                /* Hero Image */
                .hero-image-wrapper {
                    padding: 0 20px; margin-bottom: 50px; text-align: center;
                }
                .hero-img {
                    width: 100%%; max-width: 500px; border-radius: 20px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    display: block; margin: 0 auto;
                }

                /* Grid Section */
                .feature-grid {
                    padding: 0 30px; margin-bottom: 60px;
                }
                .grid-title-main {
                    font-size: 14px; font-weight: 700; text-transform: uppercase;
                    letter-spacing: 0.1em; margin-bottom: 25px; color: #94a3b8;
                    border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;
                }
                .grid-row {
                    display: flex; flex-wrap: wrap; margin: 0 -15px;
                }
                .grid-item {
                    flex: 1 1 200px; padding: 15px; margin-bottom: 15px;
                }
                .grid-h {
                    font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 6px;
                }
                .grid-p {
                    font-size: 13px; color: #64748b; line-height: 1.5; margin: 0;
                }

                /* Team Box - CSS Avatars (No Images) */
                .team-box-wrapper {
                    padding: 0 20px; text-align: center; margin-bottom: 60px;
                }
                .team-box {
                    background-color: #f8fafc; border-radius: 20px; padding: 35px 30px;
                    display: inline-block; width: 100%%; max-width: 400px;
                    border: 1px solid #f1f5f9;
                }
                .avatars {
                    margin-bottom: 16px; white-space: nowrap; height: 40px;
                    display: flex; justify-content: center; align-items: center;
                }
                /* CSS Circles */
                .css-avatar {
                    width: 36px; height: 36px; border-radius: 50%%; 
                    border: 3px solid #fff; 
                    display: inline-flex; align-items: center; justify-content: center;
                    font-size: 12px; font-weight: 700; color: #fff;
                    margin: 0 -8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .av-1 { background: #6366f1; z-index: 4; }
                .av-2 { background: #ec4899; z-index: 3; }
                .av-3 { background: #10b981; z-index: 2; }
                .av-4 { background: #f59e0b; z-index: 1; }

                .team-text {
                    font-size: 14px; color: #475569; margin: 0; font-weight: 500;
                }

                /* Footer - Dark Frontend Style */
                .footer-dark {
                    background-color: #111827; /* Gray 900 */
                    color: #9ca3af; /* Gray 400 */
                    padding: 40px 30px; font-size: 13px;
                    border-radius: 24px 24px 0 0;
                }
                .footer-brand {
                    font-size: 20px; font-weight: 700; color: #ffffff; 
                    font-style: italic; margin-bottom: 8px; letter-spacing: -1px;
                }
                .footer-desc {
                    margin-bottom: 24px; line-height: 1.5; max-width: 300px;
                }
                .footer-cols {
                    display: table; width: 100%%; margin-bottom: 30px;
                }
                .footer-col {
                    display: table-cell; vertical-align: top; width: 33%%;
                }
                .f-head {
                    color: #ffffff; font-weight: 600; margin-bottom: 12px; display: block;
                }
                .f-link {
                    display: block; color: #9ca3af; text-decoration: none; 
                    margin-bottom: 8px; font-size: 12px;
                }
                .f-link:hover { color: #ffffff; }
                .footer-bottom {
                    border-top: 1px solid #374151; padding-top: 20px; margin-top: 20px;
                    text-align: center; font-size: 11px;
                }
                
                @media only screen and (max-width: 600px) {
                   .h1-title { font-size: 26px; }
                   .footer-col { display: block; width: 100%%; margin-bottom: 20px; }
                }
              </style>
            </head>
            <body>
            
              <!-- Top Bar -->
              
              
              <div class="container">
                
                <!-- Logo (Matched to App: Italic, Bold, Tight) -->
                <div class="logo-area">
                  <h1 class="logo-text">KUT.to</h1>
                </div>

                <!-- Hero Text -->
                <div class="hero-text">
                  <h1 class="h1-title">We'd love to see you grow.</h1>
                  <p class="sub-text">
                    You're using KUT.to, and we want to ensure it's providing the best possible experience for you, %s.
                  </p>
                </div>

                <!-- CTA -->
                <div class="cta-wrapper">
                  <a href="%s" class="btn-primary">Go to Dashboard</a>
                </div>

                <!-- Large Center Image -->
                <div class="hero-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" 
                         alt="Your Growth" class="hero-img" />
                </div>

                <!-- 2x2 Feature Grid -->
                <div class="feature-grid">
                  <div class="grid-title-main">Features</div>
                  
                  <div class="grid-row">
                    <div class="grid-item">
                       <div class="grid-h">Shorten instantly</div>
                       <p class="grid-p">Generate clean, fast links in milliseconds.</p>
                    </div>
                    <div class="grid-item">
                       <div class="grid-h">Track smarter</div>
                       <p class="grid-p">Unlock real-time analytics for every link you share.</p>
                    </div>
                  </div>
                  
                  <div class="grid-row">
                    <div class="grid-item">
                       <div class="grid-h">Share accurately</div>
                       <p class="grid-p">Use custom aliases to build brand trust.</p>
                    </div>
                    <div class="grid-item">
                       <div class="grid-h">Scale faster</div>
                       <p class="grid-p">Developer-first API for high-volume needs.</p>
                    </div>
                  </div>
                </div>

                <!-- Team Section (CSS Avatars) -->
                <div class="team-box-wrapper">
                  <div class="team-box">
                    <p class="team-text">
                      "We're here to help you share better."<br/>
                      <span style="font-size: 13px; color: #94a3b8;">— The KUT.to Team</span>
                    </p>
                  </div>
                </div>

              </div>

              <!-- Footer (Dark Frontend Style) -->
              <div class="footer-dark">
                 <div class="footer-cols">
                    <div class="footer-col" style="padding-right: 20px;">
                        <div class="footer-brand">KUT.to</div>
                        <div class="footer-desc">
                            Simplifying URL shortening for efficient sharing. Join thousands managing links with ease.
                        </div>
                    </div>
                    
                    <div class="footer-col">
                        <span class="f-head">Product</span>
                        <a href="#" class="f-link">Features</a>
                        <a href="#" class="f-link">Analytics</a>
                        <a href="#" class="f-link">Get Started</a>
                    </div>
                    
                    <div class="footer-col">
                        <span class="f-head">Resources</span>
                        <a href="#" class="f-link">Documentation</a>
                        <a href="#" class="f-link">Blog</a>
                        <a href="#" class="f-link">Community</a>
                    </div>
                 </div>
                 
                 <div class="footer-bottom">
                    &copy; 2026 KUT.to. All rights reserved. <br/>
                    <a href="#" style="color:#9ca3af; margin:0 5px; text-decoration:none;">Privacy</a> | 
                    <a href="#" style="color:#9ca3af; margin:0 5px; text-decoration:none;">Terms</a>
                 </div>
              </div>

            </body>
            </html>
            """.formatted(username, frontendUrl);


        helper.setText(htmlTemplate, true);
        mailSender.send(mimeMessage);
    }
    public void sendResetPasswordEmail(String toEmail, String resetToken) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Reset your KUT.to password 🔐");

        String resetLink = frontendUrl + "/reset-password?token=" + resetToken;

        String htmlTemplate = """
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
                body { margin: 0; padding: 0; background-color: #ffffff; font-family: 'Poppins', sans-serif; color: #1e293b; }
                .container { max-width: 600px; margin: 0 auto; width: 100%%; }
                .logo-area { text-align: center; margin: 30px 0; }
                .logo-text { font-size: 34px; font-weight: 800; letter-spacing: -2px; font-style: italic; margin: 0; color: #0f172a; }
                .hero-text { text-align: center; padding: 0 20px; }
                .h1-title { font-size: 28px; font-weight: 800; line-height: 1.15; margin: 0 0 16px; color: #0f172a; }
                .sub-text { font-size: 16px; line-height: 1.6; color: #475569; margin: 0 auto 30px; max-width: 480px; }
                .cta-wrapper { text-align: center; margin-bottom: 40px; }
                .btn-primary { background-color: #2563eb; color: #ffffff !important; padding: 16px 36px; border-radius: 99px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3); }
                .footer-dark { background-color: #111827; color: #9ca3af; padding: 40px 30px; font-size: 13px; border-radius: 24px 24px 0 0; margin-top: 40px; text-align: center;}
              </style>
            </head>
            <body>
              <div class="container">
                <div class="logo-area"><h1 class="logo-text">KUT.to</h1></div>
                <div class="hero-text">
                  <h1 class="h1-title">Forgot your password?</h1>
                  <p class="sub-text">Happens to the best of us! Click the button below to reset your password. This link expires in 15 minutes.</p>
                </div>
                <div class="cta-wrapper"><a href="%s" class="btn-primary">Reset Password</a></div>
                <div class="hero-text"><p class="sub-text" style="font-size: 14px;">If you didn't request this, please ignore this email.</p></div>
              </div>
              <div class="footer-dark">&copy; 2026 KUT.to. All rights reserved.</div>
            </body>
            </html>
            """.formatted(resetLink);

        helper.setText(htmlTemplate, true);
        mailSender.send(mimeMessage);
    }
}
