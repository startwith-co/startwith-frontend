import Input from '@/shared/ui/input';
import SignupForm from './signup-form';
import signupVendorPost from '../api/signupVendorPost';

function SignupVendorForm() {
  return (
    <SignupForm
      action={signupVendorPost}
      buttonProps="bg-[#5B76FF] text-white"
      buttonName="솔루션 공급사로 파트너쉽 시작"
    >
      <Input
        type="string"
        name="company"
        placeholder="기업명(사업자명)"
        className="h-[55px] w-[600px] bg-white indent-2"
      />
      <Input
        type="string"
        name="phoneNumber"
        placeholder="담당자 전화번호"
        className="h-[55px] w-[600px] bg-white indent-2"
      />
      <Input
        type="string"
        name="email"
        placeholder="담당자 이메일"
        className="h-[55px] w-[600px] bg-white indent-2"
      />
    </SignupForm>
  );
}

export default SignupVendorForm;
