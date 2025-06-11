import ItemBox from '@/entities/search/ui/item-box';
import SolutionProps from '@/pages/search/model/type';

export default function GridItemsWidget({
  solutions,
}: {
  solutions: SolutionProps[];
}) {
  return (
    <div className="grid grid-cols-3 gap-10">
      {solutions.map((solution) => (
        <ItemBox
          key={solution.solutionSeq}
          name={solution.solutionName}
          price={String(solution.amount)}
          rating={String(solution.averageStar)}
          company={solution.vendorName}
        />
      ))}
    </div>
  );
}
