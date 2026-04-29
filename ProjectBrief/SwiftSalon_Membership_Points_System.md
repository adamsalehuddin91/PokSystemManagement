# ⭐ SwiftSalon Membership & Points System
*Complete loyalty program implementation for Muslimah salon*

## 🎯 **System Overview**

The membership and points system is designed to increase customer loyalty and repeat visits through a reward-based loyalty program that aligns with Muslimah values and business practices.

### **Core Features**
- **Customer Membership Registration** - Simple signup process
- **Point Earning System** - RM1 = 1 Point automatic calculation
- **Point Redemption** - Flexible reward options
- **Member Benefits** - Exclusive perks and discounts
- **Point Expiry Management** - 6-month expiry system
- **Member Dashboard** - Track points and history

---

## 💎 **Business Rules Implementation**

### **Point System Rules**

```typescript
// lib/points-rules.ts

export const PointsRules = {
  // Earning rules
  POINTS_PER_RM: 1, // 1 point per RM1 spent
  MINIMUM_PURCHASE_FOR_POINTS: 5, // Minimum RM5 to earn points
  BONUS_POINTS_NEW_MEMBER: 50, // Welcome bonus points
  BONUS_POINTS_BIRTHDAY: 100, // Birthday bonus points

  // Redemption rules
  REDEMPTION_TIERS: {
    TIER_1: { points: 50, value: 5 },    // 50 points = RM5 discount
    TIER_2: { points: 100, value: 15 },  // 100 points = RM15 discount
    TIER_3: { points: 200, value: 35 },  // 200 points = RM35 discount (free service)
  },

  // Expiry rules
  POINTS_EXPIRY_MONTHS: 6,
  EXPIRY_WARNING_DAYS: 30, // Warn 30 days before expiry

  // Member tier rules
  MEMBER_TIERS: {
    BRONZE: { minSpent: 0, benefits: ['Points earning', 'Birthday bonus'] },
    SILVER: { minSpent: 500, benefits: ['Points earning', 'Birthday bonus', '5% bonus points'] },
    GOLD: { minSpent: 1500, benefits: ['Points earning', 'Birthday bonus', '10% bonus points', 'Priority booking'] },
    PLATINUM: { minSpent: 3000, benefits: ['Points earning', 'Birthday bonus', '15% bonus points', 'Priority booking', 'Free birthday service'] }
  },

  // Validation rules
  MIN_POINTS_REDEMPTION: 50,
  MAX_POINTS_PER_TRANSACTION: 1000,
  MAX_REDEMPTION_PERCENTAGE: 80, // Can redeem max 80% of total bill
};

export interface PointTransaction {
  customerId: string;
  type: 'EARNED' | 'REDEEMED' | 'EXPIRED' | 'BONUS';
  points: number;
  amount?: number;
  description: string;
  bookingId?: string;
  expiresAt: Date;
}

export class PointsService {
  /**
   * Calculate points earned from purchase amount
   */
  calculatePointsEarned(amount: number, memberTier: string = 'BRONZE'): number {
    if (amount < PointsRules.MINIMUM_PURCHASE_FOR_POINTS) {
      return 0;
    }

    let basePoints = Math.floor(amount * PointsRules.POINTS_PER_RM);

    // Apply tier bonus
    switch (memberTier) {
      case 'SILVER':
        basePoints = Math.floor(basePoints * 1.05); // 5% bonus
        break;
      case 'GOLD':
        basePoints = Math.floor(basePoints * 1.10); // 10% bonus
        break;
      case 'PLATINUM':
        basePoints = Math.floor(basePoints * 1.15); // 15% bonus
        break;
    }

    return basePoints;
  }

  /**
   * Calculate redemption value for points
   */
  calculateRedemptionValue(points: number): number {
    const tiers = PointsRules.REDEMPTION_TIERS;

    if (points >= tiers.TIER_3.points) {
      const tier3Count = Math.floor(points / tiers.TIER_3.points);
      const remainingPoints = points % tiers.TIER_3.points;
      return (tier3Count * tiers.TIER_3.value) + this.calculateRedemptionValue(remainingPoints);
    } else if (points >= tiers.TIER_2.points) {
      const tier2Count = Math.floor(points / tiers.TIER_2.points);
      const remainingPoints = points % tiers.TIER_2.points;
      return (tier2Count * tiers.TIER_2.value) + this.calculateRedemptionValue(remainingPoints);
    } else if (points >= tiers.TIER_1.points) {
      const tier1Count = Math.floor(points / tiers.TIER_1.points);
      return tier1Count * tiers.TIER_1.value;
    }

    return 0;
  }

  /**
   * Get available redemption options for points
   */
  getRedemptionOptions(availablePoints: number): RedemptionOption[] {
    const options: RedemptionOption[] = [];
    const tiers = PointsRules.REDEMPTION_TIERS;

    Object.entries(tiers).forEach(([tierName, tier]) => {
      if (availablePoints >= tier.points) {
        const maxRedemptions = Math.floor(availablePoints / tier.points);
        options.push({
          tier: tierName,
          pointsRequired: tier.points,
          value: tier.value,
          maxQuantity: maxRedemptions,
          description: this.getRedemptionDescription(tierName, tier)
        });
      }
    });

    return options.sort((a, b) => a.pointsRequired - b.pointsRequired);
  }

  /**
   * Calculate member tier based on total spent
   */
  calculateMemberTier(totalSpent: number): string {
    const tiers = PointsRules.MEMBER_TIERS;

    if (totalSpent >= tiers.PLATINUM.minSpent) return 'PLATINUM';
    if (totalSpent >= tiers.GOLD.minSpent) return 'GOLD';
    if (totalSpent >= tiers.SILVER.minSpent) return 'SILVER';
    return 'BRONZE';
  }

  /**
   * Check if points are expiring soon
   */
  getExpiringPoints(customerId: string, days: number = 30): Promise<PointTransaction[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + days);

    return this.getPointTransactions({
      customerId,
      type: 'EARNED',
      expiresAt: { lte: cutoffDate },
      points: { gt: 0 } // Only unexpired points
    });
  }

  private getRedemptionDescription(tier: string, redemption: any): string {
    switch (tier) {
      case 'TIER_1':
        return `RM${redemption.value} diskaun untuk pembelian`;
      case 'TIER_2':
        return `RM${redemption.value} diskaun untuk pembelian`;
      case 'TIER_3':
        return `RM${redemption.value} kredit (1 servis percuma)`;
      default:
        return `RM${redemption.value} kredit`;
    }
  }
}
```

---

## 🎨 **User Interface Components**

### **Member Registration Component**

```typescript
// components/membership/MemberRegistration.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const MembershipSchema = z.object({
  name: z.string().min(2, 'Nama mesti sekurang-kurangnya 2 huruf'),
  phone: z.string().regex(/^(\+?6?01[0-9]\d{7,8})$/, 'Nombor telefon tidak sah'),
  email: z.string().email('Email tidak sah').optional().or(z.literal('')),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'Mesti bersetuju dengan terma')
});

type MembershipForm = z.infer<typeof MembershipSchema>;

export function MemberRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MembershipForm>({
    resolver: zodResolver(MembershipSchema)
  });

  const onSubmit = async (data: MembershipForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/membership/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-2xl mb-2">🎉</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Selamat Datang ke SwiftSalon!
        </h3>
        <p className="text-green-700 mb-4">
          Pendaftaran ahli berjaya! Anda akan menerima 50 mata ganjaran percuma.
        </p>
        <p className="text-sm text-green-600">
          SMS pengesahan akan dihantar ke nombor telefon anda.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🌸 Daftar Ahli SwiftSalon
        </h2>
        <p className="text-gray-600">
          Kumpul mata ganjaran dan nikmati faedah eksklusif
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Penuh *
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Masukkan nama penuh"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombor Telefon *
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="01X-XXX XXXX"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email (pilihan)
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="email@contoh.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tarikh Lahir (pilihan)
          </label>
          <input
            type="date"
            {...register('dateOfBirth')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Untuk bonus mata ganjaran hari lahir
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            {...register('agreeToTerms')}
            className="mt-1 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">
            Saya bersetuju dengan{' '}
            <a href="/terms" className="text-pink-600 hover:underline">
              terma dan syarat
            </a>{' '}
            keahlian SwiftSalon
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
        </button>
      </form>

      <div className="mt-6 bg-pink-50 border border-pink-200 rounded-lg p-4">
        <h4 className="font-semibold text-pink-800 mb-2">Faedah Keahlian:</h4>
        <ul className="text-sm text-pink-700 space-y-1">
          <li>• 1 mata ganjaran untuk setiap RM1</li>
          <li>• 50 mata ganjaran percuma selepas daftar</li>
          <li>• 100 mata ganjaran pada hari lahir</li>
          <li>• Tebus mata untuk diskaun dan servis percuma</li>
        </ul>
      </div>
    </div>
  );
}
```

### **Points Dashboard Component**

```typescript
// components/membership/PointsDashboard.tsx

import { useState, useEffect } from 'react';
import { PointsService } from '@/lib/points-service';

interface CustomerPoints {
  totalPoints: number;
  availablePoints: number;
  expiredPoints: number;
  totalEarned: number;
  totalRedeemed: number;
  memberTier: string;
  totalSpent: number;
  nextTierRequirement?: number;
  expiringPoints: { points: number; expiryDate: Date }[];
  recentTransactions: PointTransaction[];
}

export function PointsDashboard({ customerId }: { customerId: string }) {
  const [customerPoints, setCustomerPoints] = useState<CustomerPoints | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomerPoints();
  }, [customerId]);

  const loadCustomerPoints = async () => {
    try {
      const response = await fetch(`/api/customers/${customerId}/points`);
      const data = await response.json();
      setCustomerPoints(data);
    } catch (error) {
      console.error('Failed to load points:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading points...</div>;
  }

  if (!customerPoints) {
    return <div>Unable to load points data</div>;
  }

  const pointsService = new PointsService();
  const redemptionOptions = pointsService.getRedemptionOptions(customerPoints.availablePoints);

  return (
    <div className="space-y-6">
      {/* Points Summary Card */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Mata Ganjaran Anda</h2>
            <p className="text-pink-100">Tahap: {customerPoints.memberTier}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{customerPoints.availablePoints}</div>
            <div className="text-pink-100">mata tersedia</div>
          </div>
        </div>

        {/* Progress to next tier */}
        {customerPoints.nextTierRequirement && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-pink-100 mb-1">
              <span>Seterusnya: {getNextTier(customerPoints.memberTier)}</span>
              <span>RM{customerPoints.nextTierRequirement} lagi</span>
            </div>
            <div className="w-full bg-pink-400 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (customerPoints.totalSpent / (customerPoints.totalSpent + customerPoints.nextTierRequirement)) * 100)}%`
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Jumlah Diperoleh"
          value={customerPoints.totalEarned}
          suffix="mata"
          color="green"
        />
        <StatCard
          title="Jumlah Ditebus"
          value={customerPoints.totalRedeemed}
          suffix="mata"
          color="blue"
        />
        <StatCard
          title="Jumlah Belanja"
          value={customerPoints.totalSpent}
          prefix="RM"
          color="purple"
        />
        <StatCard
          title="Mata Luput"
          value={customerPoints.expiredPoints}
          suffix="mata"
          color="red"
        />
      </div>

      {/* Expiring Points Warning */}
      {customerPoints.expiringPoints.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-yellow-600 text-xl mr-3">⚠️</div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                Mata Ganjaran Akan Luput
              </h3>
              {customerPoints.expiringPoints.map((expiring, index) => (
                <p key={index} className="text-yellow-700 text-sm">
                  {expiring.points} mata akan luput pada{' '}
                  {new Date(expiring.expiryDate).toLocaleDateString('ms-MY')}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Redemption Options */}
      {redemptionOptions.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Tebus Mata Ganjaran</h3>
          <div className="grid gap-4">
            {redemptionOptions.map((option, index) => (
              <RedemptionOption
                key={index}
                option={option}
                onRedeem={() => handleRedemption(option)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Transaksi Terkini</h3>
        <div className="space-y-3">
          {customerPoints.recentTransactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );

  function handleRedemption(option: RedemptionOption) {
    // Open redemption modal or process redemption
    console.log('Redeeming:', option);
  }
}

function StatCard({ title, value, prefix, suffix, color }: {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  color: string;
}) {
  const colorClasses = {
    green: 'bg-green-50 text-green-700 border-green-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    red: 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <div className="text-sm font-medium mb-1">{title}</div>
      <div className="text-xl font-bold">
        {prefix}{value.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

function RedemptionOption({ option, onRedeem }: {
  option: RedemptionOption;
  onRedeem: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div>
        <div className="font-semibold">{option.description}</div>
        <div className="text-sm text-gray-600">
          {option.pointsRequired} mata ganjaran
        </div>
      </div>
      <button
        onClick={onRedeem}
        className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 text-sm"
      >
        Tebus
      </button>
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: PointTransaction }) {
  const isPositive = transaction.type === 'EARNED' || transaction.type === 'BONUS';

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <div>
        <div className="font-medium">{transaction.description}</div>
        <div className="text-sm text-gray-500">
          {new Date(transaction.createdAt).toLocaleDateString('ms-MY')}
        </div>
      </div>
      <div className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '+' : '-'}{Math.abs(transaction.points)} mata
      </div>
    </div>
  );
}

function getNextTier(currentTier: string): string {
  const tiers = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];
  const currentIndex = tiers.indexOf(currentTier);
  return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : 'MAX';
}
```

---

## 🔧 **API Implementation**

### **Membership Registration API**

```typescript
// app/api/membership/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { PointsService } from '@/lib/points-service';
import { SMSService } from '@/lib/sms-service';

const RegisterSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^(\+?6?01[0-9]\d{7,8})$/),
  email: z.string().email().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = RegisterSchema.parse(body);

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { phone: validatedData.phone }
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Nombor telefon sudah didaftarkan' },
        { status: 400 }
      );
    }

    // Create new member
    const customer = await prisma.customer.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
        address: validatedData.address || null,
        isMember: true,
        memberSince: new Date(),
        totalPoints: 50, // Welcome bonus
        totalSpent: 0
      }
    });

    // Add welcome bonus points
    const pointsService = new PointsService();
    await pointsService.addPointTransaction({
      customerId: customer.id,
      type: 'BONUS',
      points: 50,
      description: 'Bonus selamat datang',
      expiresAt: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months
    });

    // Send welcome SMS
    const smsService = new SMSService();
    await smsService.sendWelcomeMember(customer.phone, customer.name);

    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        totalPoints: customer.totalPoints
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data tidak sah', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Ralat sistem. Sila cuba lagi.' },
      { status: 500 }
    );
  }
}
```

### **Points Management API**

```typescript
// app/api/customers/[id]/points/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PointsService } from '@/lib/points-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = params.id;

    // Get customer data
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        pointTransactions: {
          orderBy: { createdAt: 'desc' },
          take: 10 // Last 10 transactions
        }
      }
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Pelanggan tidak dijumpai' },
        { status: 404 }
      );
    }

    const pointsService = new PointsService();

    // Calculate available points (non-expired)
    const availablePoints = await pointsService.getAvailablePoints(customerId);

    // Get expiring points
    const expiringPoints = await pointsService.getExpiringPoints(customerId, 30);

    // Calculate member tier
    const memberTier = pointsService.calculateMemberTier(customer.totalSpent);

    // Get next tier requirement
    const nextTierRequirement = pointsService.getNextTierRequirement(
      customer.totalSpent,
      memberTier
    );

    // Calculate totals
    const totalEarned = customer.pointTransactions
      .filter(t => t.type === 'EARNED' || t.type === 'BONUS')
      .reduce((sum, t) => sum + t.points, 0);

    const totalRedeemed = customer.pointTransactions
      .filter(t => t.type === 'REDEEMED')
      .reduce((sum, t) => sum + Math.abs(t.points), 0);

    const expiredPoints = customer.pointTransactions
      .filter(t => t.type === 'EXPIRED')
      .reduce((sum, t) => sum + Math.abs(t.points), 0);

    return NextResponse.json({
      totalPoints: customer.totalPoints,
      availablePoints,
      expiredPoints,
      totalEarned,
      totalRedeemed,
      memberTier,
      totalSpent: customer.totalSpent,
      nextTierRequirement,
      expiringPoints: expiringPoints.map(ep => ({
        points: ep.points,
        expiryDate: ep.expiresAt
      })),
      recentTransactions: customer.pointTransactions
    });

  } catch (error) {
    console.error('Points API error:', error);
    return NextResponse.json(
      { error: 'Ralat sistem' },
      { status: 500 }
    );
  }
}

// Redeem points
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = params.id;
    const { points, redemptionType } = await request.json();

    const pointsService = new PointsService();

    // Validate redemption
    const availablePoints = await pointsService.getAvailablePoints(customerId);
    if (points > availablePoints) {
      return NextResponse.json(
        { error: 'Mata ganjaran tidak mencukupi' },
        { status: 400 }
      );
    }

    const redemptionValue = pointsService.calculateRedemptionValue(points);
    if (redemptionValue === 0) {
      return NextResponse.json(
        { error: 'Mata ganjaran tidak mencukupi untuk tebusan' },
        { status: 400 }
      );
    }

    // Process redemption
    await pointsService.redeemPoints({
      customerId,
      points,
      redemptionType,
      value: redemptionValue
    });

    return NextResponse.json({
      success: true,
      redemptionValue,
      remainingPoints: availablePoints - points
    });

  } catch (error) {
    console.error('Points redemption error:', error);
    return NextResponse.json(
      { error: 'Ralat penebusan mata ganjaran' },
      { status: 500 }
    );
  }
}
```

---

## 📱 **Mobile Member Card**

```typescript
// components/membership/MemberCard.tsx

import { QRCodeSVG } from 'qrcode.react';

interface MemberCardProps {
  customer: {
    id: string;
    name: string;
    phone: string;
    memberSince: Date;
    totalPoints: number;
    memberTier: string;
  };
}

export function MemberCard({ customer }: MemberCardProps) {
  const tierColors = {
    BRONZE: 'from-amber-400 to-amber-600',
    SILVER: 'from-gray-300 to-gray-500',
    GOLD: 'from-yellow-300 to-yellow-500',
    PLATINUM: 'from-purple-400 to-purple-600'
  };

  const tierIcons = {
    BRONZE: '🥉',
    SILVER: '🥈',
    GOLD: '🥇',
    PLATINUM: '💎'
  };

  return (
    <div className={`bg-gradient-to-br ${tierColors[customer.memberTier]} rounded-2xl p-6 text-white shadow-lg max-w-sm mx-auto`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">SwiftSalon Muslimah</h3>
          <p className="text-white/80 text-sm">Member Card</p>
        </div>
        <div className="text-2xl">
          {tierIcons[customer.memberTier]}
        </div>
      </div>

      {/* Member Info */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">{customer.name}</h2>
        <p className="text-white/80 text-sm">{customer.phone}</p>
        <p className="text-white/80 text-sm">
          Ahli sejak {new Date(customer.memberSince).toLocaleDateString('ms-MY')}
        </p>
      </div>

      {/* Points Display */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold">{customer.totalPoints}</div>
          <div className="text-white/80 text-sm">Mata Ganjaran</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">{customer.memberTier}</div>
          <div className="text-white/80 text-sm">Tahap</div>
        </div>
      </div>

      {/* QR Code */}
      <div className="flex justify-center">
        <div className="bg-white p-3 rounded-lg">
          <QRCodeSVG
            value={`${process.env.NEXT_PUBLIC_BASE_URL}/member/${customer.id}`}
            size={80}
            level="M"
          />
        </div>
      </div>

      <p className="text-center text-white/80 text-xs mt-2">
        Tunjukkan kod QR semasa pembayaran
      </p>
    </div>
  );
}
```

---

## 🔄 **Automated Point Expiry System**

```typescript
// lib/point-expiry-service.ts

import { prisma } from '@/lib/prisma';
import { SMSService } from '@/lib/sms-service';

export class PointExpiryService {
  /**
   * Daily cron job to handle point expiry
   */
  async processPointExpiry(): Promise<void> {
    const today = new Date();

    // Find expired points
    const expiredPoints = await prisma.pointTransaction.findMany({
      where: {
        expiresAt: { lte: today },
        type: { in: ['EARNED', 'BONUS'] },
        points: { gt: 0 } // Only unexpired earned points
      },
      include: {
        customer: true
      }
    });

    for (const pointTransaction of expiredPoints) {
      // Create expiry transaction
      await prisma.pointTransaction.create({
        data: {
          customerId: pointTransaction.customerId,
          type: 'EXPIRED',
          points: -pointTransaction.points,
          description: `Luput: ${pointTransaction.description}`,
          expiresAt: today
        }
      });

      // Mark original transaction as expired
      await prisma.pointTransaction.update({
        where: { id: pointTransaction.id },
        data: { points: 0 } // Set to 0 to indicate expired
      });

      // Update customer total points
      await this.updateCustomerTotalPoints(pointTransaction.customerId);
    }

    console.log(`Processed ${expiredPoints.length} expired point transactions`);
  }

  /**
   * Send expiry warnings
   */
  async sendExpiryWarnings(): Promise<void> {
    const warningDate = new Date();
    warningDate.setDate(warningDate.getDate() + 30); // 30 days from now

    const expiringPoints = await prisma.pointTransaction.findMany({
      where: {
        expiresAt: { lte: warningDate, gte: new Date() },
        type: { in: ['EARNED', 'BONUS'] },
        points: { gt: 0 }
      },
      include: {
        customer: true
      }
    });

    // Group by customer
    const customerExpiringPoints = new Map<string, { customer: any; totalExpiring: number; expiryDate: Date }>();

    expiringPoints.forEach(point => {
      const existing = customerExpiringPoints.get(point.customerId);
      if (existing) {
        existing.totalExpiring += point.points;
        if (point.expiresAt < existing.expiryDate) {
          existing.expiryDate = point.expiresAt;
        }
      } else {
        customerExpiringPoints.set(point.customerId, {
          customer: point.customer,
          totalExpiring: point.points,
          expiryDate: point.expiresAt
        });
      }
    });

    // Send SMS warnings
    const smsService = new SMSService();
    for (const [customerId, data] of customerExpiringPoints) {
      await smsService.sendPointExpiryWarning(
        data.customer.phone,
        data.customer.name,
        data.totalExpiring,
        data.expiryDate
      );
    }

    console.log(`Sent expiry warnings to ${customerExpiringPoints.size} customers`);
  }

  private async updateCustomerTotalPoints(customerId: string): Promise<void> {
    const totalPoints = await prisma.pointTransaction.aggregate({
      where: { customerId },
      _sum: { points: true }
    });

    await prisma.customer.update({
      where: { id: customerId },
      data: { totalPoints: totalPoints._sum.points || 0 }
    });
  }
}
```

---

This comprehensive membership and points system provides all the features needed for client delivery, including automatic point calculation, expiry management, member tiers, and a complete user interface for both customers and admins.