/**
 * Environment Variables Validation
 * Ensures mandatory variables are present and warns on optional services
 */

const mandatoryEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
];

const optionalEnvVars = [
  'EMAIL_USER',
  'EMAIL_APP_PASSWORD',
];

const missingMandatory = mandatoryEnvVars.filter(v => !process.env[v]);
const missingOptional = optionalEnvVars.filter(v => !process.env[v]);

if (missingMandatory.length > 0) {
  console.error('❌ Missing critical environment variables:');
  missingMandatory.forEach(v => console.error(`   - ${v}`));
  console.error('\nPlease set critical environment variables before starting the backend.');
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
} else {
  console.log('✅ Core environment variables configured');
}

if (missingOptional.length > 0) {
  console.warn('⚠️ Note: Optional email variables not configured:');
  missingOptional.forEach(v => console.warn(`   - ${v}`));
  console.warn('   (Email OTP delivery will be disabled or mocked)\n');
}
