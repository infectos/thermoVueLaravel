@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Confirm users</div>
                <div class="panel-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>IsConfirmed?</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($users as $user)
                            <tr>
                                <td>{{ $user->id }}</td>
                                <td>{{ $user->name }}</td>
                                <td>{{ $user->confirmed }}</td>
                                <td style="text-align:right;">
                                    <a href="/admin/confirm/{{ $user->id }}" class="btn btn-primary">Confirm</a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
