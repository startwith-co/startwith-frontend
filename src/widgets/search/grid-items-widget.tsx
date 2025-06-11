import ItemBox from '@/entities/search/ui/item-box';
import SolutionProps from '@/pages/search/model/type';

export default function GridItemsWidget({
  solutions,
}: {
  solutions: SolutionProps[];
}) {
  return solutions.length === 0 ? (
    <div>검색 결과가 없습니다.</div>
  ) : (
    <div className="grid grid-cols-3 gap-10">
      {solutions.map((solution) => (
        <ItemBox
          key={solution.solutionSeq}
          name={solution.solutionName}
          price={String(solution.amount)}
          rating={String(solution.averageStar)}
          company={solution.vendorName}
          vendorSeq={String(solution.vendorSeq)}
          category={solution.category}
        />
      ))}
    </div>
  );
}
