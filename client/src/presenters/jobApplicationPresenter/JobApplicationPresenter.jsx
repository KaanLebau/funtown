import JobApplicationView from "../../views/jobApplicationView/JobApplicationView";
import { currentPositions } from "../../model/businessModel";
import { useRecoilValue } from "recoil";
/**
 *
 * @param {*} props
 * @returns  {JSX.Element}
 */
function JobApplicationPresenter(props) {
  const positions = useRecoilValue(currentPositions);

  return (
    <div data-testid="job-application-presenter">
      <JobApplicationView
        position={positions}
        experience={[
          0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5,
          1.6, 1.7, 1.8, 1.9, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.1,
          3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
        ]}
      />
    </div>
  );
}

export default JobApplicationPresenter;
