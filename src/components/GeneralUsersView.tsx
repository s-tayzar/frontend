import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Button, Form, Nav } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import '../styles/GeneralUsersView.css'

const GeneralUsersView = () => {
    
    const thArray = ["ITE番号","名前","ステータス","時給","日本語レベル","経験年数","得意とする分野","スキル","資格"];

    const tdArray = [
        [ "ite000247" , "TAY ZAR SOE" , "稼働中" , "2500" , "JLPT N4" , "5" , "Java" , "" , "" ] ,
        [ "ite001191" , "Anushka Indunil Warapitiya" , "待機中" , "2600" , "NAT TEST N3" , "6" , "C#, Flutter, Swift, Kotlin, Java Android" , "" , "" ] ,
        [ "ite001444" , "SU MYAT LWIN" , "復社予定者" , "2700" , "BJT N2" , "7" , "Node.JS, C++, Python" , "" , "" ] ,
        [ "ite001451" , "DIKSHA RAWAT" , "入社予定者" , "2800" , "J.TEST N1" , "8" , "PHP, React Js, Next Js" , "" , "" ] 
    ];

    const tagArray = ["C#", "React", "Angular", "Node", "Mongo", "Java", "JavaScript", "JQuery", "Python", "Visual Studio", "MS SQL", "My SQL", "Oracle", "No SQL", "Vue Js", "Cofee Js", "Linq Query" ];

    const { register, handleSubmit, reset } = useForm();  

    const onSubmit = async (data:any) => {

        // if (data.searchKeyword) {
        // const result:any = await searchByKeyWord(navigate, data);
        // setData(result);

        // } else {
        // const result:any = await search(navigate, data);
        // setData(result);
        // }
        // reset();
    }

return (
    <>
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className = 'label-container'>
                    <div>
                        <Form.Label className = 'label-text'>日本語レベル :</Form.Label>
                        <input {...register("jpLevel")} />
                    </div>
                    <div>
                    <Form.Label className = 'label-text'>経験年数 :</Form.Label>
                    <input className = "exp-textbox" {...register("expOver")} />
                    <Form.Label className = 'label-text'>以上</Form.Label>
                    <input className = "exp-textbox" {...register("expUnder")} />
                    <Form.Label className = 'label-text'>以下</Form.Label>          
                    </div>
                    <div>
                    <Form.Label className = 'label-text'>資格 :</Form.Label>
                    <input {...register("certificate")} />
                    </div>
                </div>
                <div>
                    <Form.Label className = 'label-tag-text'>検索レベルタグ :</Form.Label>
                    <div id="id_language">
                        {tagArray.map(labelTag => {
                            return (              
                            <Form.Label key={labelTag}>
                                <input type="checkbox" multiple {...register("language")} value={labelTag} />
                                <span>{labelTag}</span>
                            </Form.Label>
                            );
                        })}
                    </div>
                    <Form.Label className = 'label-tag-text'>検索キーワード :</Form.Label>
                    <input className = 'search-textbox' {...register("searchKeyword")} />
                </div>
                <div className= 'flex-submit'>
                    <div>
                    <Button type="reset" variant="primary">クリア</Button>
                    </div>  
                    <div>
                    <Button type="submit" variant="primary">検索</Button>
                    </div>
                </div>
            </Form>
        </div>
        <div>
            <Table hover>
                <thead style={styles.tableheader}>
                    <tr key="header">
                        {
                            thArray.map((prop, key) => {
                                return (
                                <th key={key}>{prop}</th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        tdArray.map((prop, key) => {
                            return (
                                <tr key={prop[0]}>
                                    <td key={key + 0}>
                                        <Nav>
                                            <Nav.Link id={prop[0]} onClick={(e) => {alert("Edit : " + prop[0]); e.preventDefault(); }}>
                                                {prop[0]}
                                            </Nav.Link>
                                        </Nav>
                                    </td>
                                    <td key={key + 1}>{prop[1]}</td>
                                    <td key={key + 2}>{prop[2]}</td>
                                    <td key={key + 3}>{prop[3]}</td>
                                    <td key={key + 4}>{prop[4]}</td>
                                    <td key={key + 5}>{prop[5]}</td>
                                    <td key={key + 6}>{prop[6]}</td>
                                    <td key={key + 7}>{prop[7]}</td>
                                    <td key={key + 8}>{prop[8]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    </>
);
}

export default GeneralUsersView;

const styles: { [name: string]: React.CSSProperties } = {
    tableheader: {
        textAlign: 'center',
        border: '#007bff',
        background: '#007bff',
        color: '#E9ECEF'
    },
  };