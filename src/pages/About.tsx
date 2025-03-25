
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="page-transition container-content py-10">
      <h1 className="page-title">About NepFacto</h1>
      <p className="page-subtitle max-w-2xl mx-auto">
        A civic platform helping Nepali citizens explore, understand, and track political statements and promises.
      </p>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              NepFacto is a civic platform helping Nepali citizens explore, understand, and track political statements and promises. We prioritize facts, community input, and transparency — without judgment.
            </p>
            <p>
              We believe that an informed citizenry is essential for a functioning democracy. By providing a neutral platform for tracking political statements and promises, we aim to empower Nepali citizens to hold their elected officials accountable.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Our Principles</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">Neutrality</h3>
                <p>We do not take political sides. Our goal is to present information accurately and let citizens form their own opinions.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Transparency</h3>
                <p>All claims on our platform are linked to their sources, allowing users to verify information for themselves.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Community Input</h3>
                <p>We rely on contributions from citizens to build a comprehensive database of political statements and promises.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Education</h3>
                <p>Our platform aims to educate citizens about political processes and policy decisions that affect their lives.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Submission:</strong> Users and our team submit political statements and promises made by politicians and parties.
              </li>
              <li>
                <strong>Verification:</strong> Our team reviews submissions to ensure they include accurate information and reliable sources.
              </li>
              <li>
                <strong>Tracking:</strong> We monitor the status of promises and update the platform as developments occur.
              </li>
              <li>
                <strong>Discussion:</strong> Users can engage in respectful discussion through comments on individual statements and promises.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
            <p className="mb-4">
              NepFacto is a community-driven platform, and we need your help to make it as comprehensive and useful as possible.
            </p>
            <p>
              You can contribute by submitting political statements and promises, providing updates on existing promises, and engaging in respectful discussion in the comments section.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
