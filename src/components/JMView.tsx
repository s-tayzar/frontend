import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import deleteIcon from '../images/delete128.png';
import editIcon from '../images/edit128.png';

const JMView = () => {

    const thArray = ["ITE番号","名前","ステータス","時給","日本語レベル","経験年数","得意とする分野","スキル","資格","アクション"];

    const tdArray = [
        [ "ite000247" , "TAY ZAR SOE" , "稼働中" , "2500" , "JLPT N4" , "5" , "Java" , "" , "" ] ,
        [ "ite001191" , "Anushka Indunil Warapitiya" , "待機中" , "2600" , "NAT TEST N3" , "6" , "C#, Flutter, Swift, Kotlin, Java Android" , "" , "" ] ,
        [ "ite001444" , "SU MYAT LWIN" , "復社予定者" , "2700" , "BJT N2" , "7" , "Node.JS, C++, Python" , "" , "" ] ,
        [ "ite001451" , "DIKSHA RAWAT" , "入社予定者" , "2800" , "J.TEST N1" , "8" , "PHP, React Js, Next Js" , "" , "" ] 
    ];

    // const [data, setData] = useState([]);

    return (
        <Table hover>
            <thead style={styles.tableheader}>
                <tr>
                    {
                        thArray.map((prop, key) => {
                            return (
                            <th  key={key}>{prop}</th>
                            );
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tdArray.map((prop,key) => {
                        return (
                            <tr key={key}>{
                                prop.map((prop,key)=> {
                                    return (
                                        <td key={key}>{prop}</td>
                                    );
                                })
                            }
                                <td key={key}>
                                    <a
                                        className="btn btn-success btn-link"
                                        href="/"
                                        data-original-title=""
                                        onClick={(e) => {alert("Edit : " + prop[0]); e.preventDefault(); }}
                                        >
                                        <img src={editIcon} alt="Edit" width={18} height={18}/>
                                    </a>
                                    <a
                                        className="btn btn-danger btn-link"
                                        href="/"
                                        data-original-title=""
                                        onClick={(e) => {alert("Delete : " + prop[0]); e.preventDefault(); }}
                                        >
                                        <img src={deleteIcon} alt="Edit" width={18} height={18}/>
                                    </a>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export default JMView;

// Just some styles
const styles: { [name: string]: React.CSSProperties } = {
    tableheader: {
        textAlign: 'center',
        border: '#007bff',
        background: '#007bff',
        color: '#E9ECEF'
    },
  };