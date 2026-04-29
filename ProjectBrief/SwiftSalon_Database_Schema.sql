-- SwiftSalon Muslimah Database Schema
-- Comprehensive database design for salon management system
-- Technology: PostgreSQL with Prisma ORM
-- Target: Muslimah salon management with booking, membership, and points

-- ================================
-- CORE BUSINESS ENTITIES
-- ================================

-- Services offered by the salon
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL, -- e.g., "Cuci Rambut", "Blow Dry", "Facial"
    description TEXT,
    duration_minutes INTEGER NOT NULL, -- Service duration
    price DECIMAL(10,2) NOT NULL, -- Service price in RM
    is_active BOOLEAN DEFAULT true,
    category VARCHAR(50), -- "HAIR", "FACIAL", "HENNA", "SPA", "NAIL"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Female staff members
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    specialties TEXT[], -- Array of service categories they can perform
    is_active BOOLEAN DEFAULT true,
    hire_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff working hours and availability
CREATE TABLE staff_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
    day_of_week INTEGER, -- 0=Sunday, 1=Monday, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- CUSTOMER MANAGEMENT
-- ================================

-- Customer information and membership
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL, -- Primary identifier
    email VARCHAR(100),
    address TEXT,
    date_of_birth DATE,
    is_member BOOLEAN DEFAULT false,
    member_since DATE,
    total_points INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0.00,
    last_visit DATE,
    notes TEXT, -- Special preferences or notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Point transaction history
CREATE TABLE point_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) NOT NULL, -- "EARNED", "REDEEMED", "EXPIRED"
    points INTEGER NOT NULL, -- Positive for earned, negative for redeemed
    amount DECIMAL(10,2), -- Associated monetary amount
    description TEXT,
    expires_at DATE, -- Points expiry date (6 months from earned date)
    booking_id UUID, -- Reference to related booking if applicable
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- BOOKING SYSTEM
-- ================================

-- Main booking/appointment table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    staff_id UUID REFERENCES staff(id),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW
    total_amount DECIMAL(10,2) NOT NULL,
    points_earned INTEGER DEFAULT 0,
    points_redeemed INTEGER DEFAULT 0,
    payment_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, PAID, PARTIAL
    payment_method VARCHAR(20), -- CASH, QR_PAY, FPX
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services included in each booking
CREATE TABLE booking_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id),
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- PAYMENT TRACKING
-- ================================

-- Payment records
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL, -- CASH, QR_PAY, FPX
    payment_reference VARCHAR(100), -- Transaction ID for digital payments
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_by UUID REFERENCES staff(id), -- Staff who processed payment
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- SYSTEM ADMINISTRATION
-- ================================

-- Admin users for system access
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'ADMIN', -- ADMIN, MANAGER, STAFF
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System settings and configuration
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50), -- GENERAL, POINTS, PAYMENT, NOTIFICATION
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- COMMUNICATION & NOTIFICATIONS
-- ================================

-- WhatsApp message templates
CREATE TABLE message_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    template_type VARCHAR(50) NOT NULL, -- BOOKING_CONFIRMATION, REMINDER, WELCOME
    message_text TEXT NOT NULL,
    variables TEXT[], -- Array of placeholder variables like {customer_name}
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notification/message sending log
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    booking_id UUID REFERENCES bookings(id),
    type VARCHAR(50) NOT NULL, -- WHATSAPP, SMS, EMAIL
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SENT, FAILED
    sent_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- REPORTING & ANALYTICS
-- ================================

-- Daily summary for quick dashboard access
CREATE TABLE daily_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    summary_date DATE UNIQUE NOT NULL,
    total_bookings INTEGER DEFAULT 0,
    completed_bookings INTEGER DEFAULT 0,
    total_revenue DECIMAL(10,2) DEFAULT 0.00,
    total_points_earned INTEGER DEFAULT 0,
    total_points_redeemed INTEGER DEFAULT 0,
    new_customers INTEGER DEFAULT 0,
    new_members INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- INDEXES FOR PERFORMANCE
-- ================================

-- Customer indexes
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_member ON customers(is_member);
CREATE INDEX idx_customers_last_visit ON customers(last_visit);

-- Booking indexes
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_staff ON bookings(staff_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Point transaction indexes
CREATE INDEX idx_points_customer ON point_transactions(customer_id);
CREATE INDEX idx_points_type ON point_transactions(transaction_type);
CREATE INDEX idx_points_expires ON point_transactions(expires_at);

-- Service and staff indexes
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_staff_active ON staff(is_active);

-- ================================
-- SAMPLE DATA INSERT
-- ================================

-- Default salon services
INSERT INTO services (name, description, duration_minutes, price, category) VALUES
('Cuci Rambut', 'Shampooing rambut dengan produk halal', 30, 25.00, 'HAIR'),
('Blow Dry', 'Pengeringan dan styling rambut', 45, 35.00, 'HAIR'),
('Potong Rambut', 'Pemotongan rambut mengikut kesesuaian wajah', 60, 45.00, 'HAIR'),
('Rawatan Wajah Basic', 'Pembersihan dan rawatan wajah asas', 75, 80.00, 'FACIAL'),
('Rawatan Wajah Premium', 'Rawatan wajah lengkap dengan mask', 90, 120.00, 'FACIAL'),
('Inai Tangan', 'Lukisan inai di tangan', 45, 30.00, 'HENNA'),
('Inai Kaki', 'Lukisan inai di kaki', 30, 25.00, 'HENNA'),
('Spa Kaki', 'Urutan dan rawatan kaki', 60, 50.00, 'SPA'),
('Manicure', 'Rawatan kuku tangan', 45, 40.00, 'NAIL'),
('Pedicure', 'Rawatan kuku kaki', 60, 45.00, 'NAIL');

-- Default system settings
INSERT INTO settings (key, value, description, category) VALUES
('points_per_rm', '1', 'Points earned per RM spent', 'POINTS'),
('points_expiry_months', '6', 'Months before points expire', 'POINTS'),
('reminder_hours_before', '24', 'Hours before appointment to send reminder', 'NOTIFICATION'),
('working_hours_start', '09:00', 'Salon opening time', 'GENERAL'),
('working_hours_end', '19:00', 'Salon closing time', 'GENERAL'),
('booking_advance_days', '30', 'Maximum days in advance for booking', 'GENERAL'),
('whatsapp_business_number', '', 'WhatsApp Business API number', 'NOTIFICATION');

-- Default admin user (password should be hashed in real application)
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@swiftsalon.com', '$2b$12$example_hash_here', 'ADMIN');

-- Default message templates
INSERT INTO message_templates (name, template_type, message_text, variables) VALUES
('Booking Confirmation', 'BOOKING_CONFIRMATION',
 'Assalamualaikum {customer_name}, tempahan anda untuk {service_name} pada {booking_date} jam {booking_time} telah disahkan. Terima kasih! - SwiftSalon Muslimah',
 ARRAY['customer_name', 'service_name', 'booking_date', 'booking_time']),
('Appointment Reminder', 'REMINDER',
 'Assalamualaikum {customer_name}, ingatkan bahawa anda ada appointment {service_name} esok jam {booking_time}. Jumpa di salon ya! - SwiftSalon Muslimah',
 ARRAY['customer_name', 'service_name', 'booking_time']),
('Welcome Member', 'WELCOME',
 'Selamat datang ke SwiftSalon Muslimah! Anda kini ahli kami dan boleh kumpul mata ganjaran. Terima kasih atas sokongan anda!',
 ARRAY['customer_name']);

-- ================================
-- VIEWS FOR COMMON QUERIES
-- ================================

-- Customer summary view
CREATE VIEW customer_summary AS
SELECT
    c.id,
    c.name,
    c.phone,
    c.is_member,
    c.total_points,
    c.total_spent,
    c.last_visit,
    COUNT(b.id) as total_bookings,
    COUNT(CASE WHEN b.status = 'COMPLETED' THEN 1 END) as completed_bookings
FROM customers c
LEFT JOIN bookings b ON c.id = b.customer_id
GROUP BY c.id, c.name, c.phone, c.is_member, c.total_points, c.total_spent, c.last_visit;

-- Daily booking summary view
CREATE VIEW daily_booking_summary AS
SELECT
    booking_date,
    COUNT(*) as total_bookings,
    COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_bookings,
    COUNT(CASE WHEN status = 'CANCELLED' THEN 1 END) as cancelled_bookings,
    COUNT(CASE WHEN status = 'NO_SHOW' THEN 1 END) as no_shows,
    SUM(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE 0 END) as revenue
FROM bookings
GROUP BY booking_date
ORDER BY booking_date DESC;

-- Popular services view
CREATE VIEW popular_services AS
SELECT
    s.name,
    s.category,
    s.price,
    COUNT(bs.id) as booking_count,
    SUM(bs.total_price) as total_revenue
FROM services s
LEFT JOIN booking_services bs ON s.id = bs.service_id
LEFT JOIN bookings b ON bs.booking_id = b.id AND b.status = 'COMPLETED'
GROUP BY s.id, s.name, s.category, s.price
ORDER BY booking_count DESC;

-- ================================
-- SECURITY AND CONSTRAINTS
-- ================================

-- Add constraints for business rules
ALTER TABLE point_transactions ADD CONSTRAINT valid_points_amount
    CHECK (points != 0); -- Points cannot be zero

ALTER TABLE bookings ADD CONSTRAINT valid_booking_time
    CHECK (end_time > start_time); -- End time must be after start time

ALTER TABLE customers ADD CONSTRAINT valid_phone_format
    CHECK (phone ~ '^\+?[0-9\-\s\(\)]+$'); -- Basic phone format validation

-- Add triggers for automatic updates
CREATE OR REPLACE FUNCTION update_customer_totals()
RETURNS TRIGGER AS $$
BEGIN
    -- Update customer total points and spent amount
    UPDATE customers SET
        total_points = (
            SELECT COALESCE(SUM(points), 0)
            FROM point_transactions
            WHERE customer_id = NEW.customer_id
        ),
        total_spent = (
            SELECT COALESCE(SUM(total_amount), 0)
            FROM bookings
            WHERE customer_id = NEW.customer_id AND status = 'COMPLETED'
        ),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.customer_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update customer totals when bookings are completed
CREATE TRIGGER update_customer_totals_on_booking
    AFTER UPDATE OF status ON bookings
    FOR EACH ROW
    WHEN (NEW.status = 'COMPLETED' AND OLD.status != 'COMPLETED')
    EXECUTE FUNCTION update_customer_totals();

-- Trigger to update customer totals when points are added/redeemed
CREATE TRIGGER update_customer_totals_on_points
    AFTER INSERT ON point_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_totals();

-- ================================
-- COMMENTS FOR DOCUMENTATION
-- ================================

COMMENT ON TABLE services IS 'Salon services offered to customers';
COMMENT ON TABLE customers IS 'Customer information and membership details';
COMMENT ON TABLE bookings IS 'Appointment bookings and scheduling';
COMMENT ON TABLE point_transactions IS 'Point earning and redemption history';
COMMENT ON TABLE staff IS 'Female staff members and their information';
COMMENT ON TABLE payments IS 'Payment processing and tracking';

-- End of SwiftSalon Database Schema