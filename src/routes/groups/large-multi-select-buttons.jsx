import { Button, Col, Row, Typography } from 'antd';
import { AiTwotoneLock } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';

export default function LargeMultiSelectButtons({
  onCheckInClick,
  onDeleteClick,
}) {
  return (
    <Row
      justify={'center'}
      align={'middle'}
      style={{ height: '50%' }}
    >
      <Col span={12}>
        <Button
          style={{
            width: '100%',
            borderRadius: '1em',
            height: '100%',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 0.5em',
            backgroundColor: '#fafafa',
            boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
          }}
          onClick={onCheckInClick}
        >
          <Typography.Text
            style={{
              marginRight: '0.5em',
              width: '40%',
              textAlign: 'center',
            }}
          >
            Check-in
          </Typography.Text>

          <AiTwotoneLock
            size={'3em'}
            color='grey'
          />
        </Button>

        <Button
          style={{
            width: '100%',
            borderRadius: '1em',
            height: '100%',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 0.5em',
            backgroundColor: '#fafafa',
            boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
            marginTop: '2em',
          }}
          onClick={onDeleteClick}
        >
          <Typography.Text
            style={{
              marginRight: '0.5em',
              width: '40%',
              textAlign: 'center',
            }}
          >
            Delete
          </Typography.Text>

          <MdOutlineDeleteOutline
            size={'3em'}
            color='#ff7875'
          />
        </Button>
      </Col>
    </Row>
  );
}
