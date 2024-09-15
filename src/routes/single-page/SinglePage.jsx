import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "../../components/container/Container";
import { useGetSingleProductQuery } from '../../redux/api/singlePageApi';

const SinglePage = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(_id);
  

  return (
    <Container>
      
    </Container>
  );
};

export default SinglePage;