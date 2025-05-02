import Input from '@/shared/ui/input';
import SignupForm from './signup-form';
import signupUserPost from '../api/signupUserPost';

function SignupUserForm() {
  return (
    <SignupForm
      action={signupUserPost}
      buttonProps="bg-white text-[#5B76FF]"
      buttonName="기업 고객 등록 신청"
    >
      <Input
        type="string"
        name="company"
        placeholder="기업명(사업자명)"
        className="h-[55px] w-[600px] bg-white indent-2"
      />
      <Input
        type="string"
        name="email"
        placeholder="담당자 이메일"
        className="h-[55px] w-[600px] bg-white indent-2"
      />
      <Input
        type="string"
        name="industry"
        placeholder="종사 산업군"
        className="h-[55px] w-[600px] bg-white indent-2"
      />
    </SignupForm>
  );
}

export default SignupUserForm;
